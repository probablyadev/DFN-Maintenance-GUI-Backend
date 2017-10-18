#!/bin/bash
# universal USB hdds setup script for DFN small / kit / ext cameras
# (c) Martin Cupak
#
# use lsblk to find out what disks/partitions are available
# When called -i (--interactive), guids the command-line 
# user through HDD selection
#
######################################################################

#-----------------------------------
# script configuration
#-----------------------------------
# DFN_VM public IP
downloadHost=dfn-user@dfn.d-f-n.org
# DFN openvpn
#downloadHost=mcu@10.1.16.1
# mcu laptop locally
#downloadHost=martin@192.168.1.73

dfn_AStone_USB_ID="174c:55aa"
dfn_Orico_7629_silver_USB_ID="152d:0551"

#-----------------------------------
# check prerequisities
[ ! -x $(which parted) ] && echo "ERROR: parted missing, install it [apt-get install parted]" && exit 999
[ ! -x $(which smartctl) ] && echo "ERROR: smartctl missing, install it [apt-get install smartmontools] " && exit 999
[ ! -x $(which lsblk) ] && echo "ERROR: lsblk missing, install it [apt-get install util-linux] " && exit 999
#-----------------------------------

printDiskSerialNumberJmicron() {
    mountPoint=${1}
    jMicronID=${2}
    dataDevice=`mount | grep ${mountPoint} | cut -d " " -f 1`
    echo -n "${mountPoint} ${dataDevice} "
    echo -n "JMicron ID ${jMicronID} "
    echo -n `smartctl -i -d usbjmicron,${jMicronID} ${dataDevice} | grep "Device Model:" | sed "s/:     /: /g"`
    echo -n " "
    smartctl -i -d usbjmicron,${jMicronID} ${dataDevice} | grep "Serial Number:" | sed "s/:    /: /g"
}

#--------------------------------------------------------
printDiskSerialNumber() {
    mountPoint=${1}
    dataDevice=`mount | grep ${mountPoint} | cut -d " " -f 1`
    echo -n "${mountPoint} ${dataDevice} "
    echo -n `smartctl -i -d sat ${dataDevice} | grep "Device Model:" | sed "s/:     /: /g"`
    echo -n `smartctl -i -d sat ${dataDevice} | grep "Device Model:" | sed "s/:     /: /g"`
    echo -n " "
    smartctl -i -d sat ${dataDevice} | grep "Serial Number:" | sed "s/:    /: /g"
}

#--------------------------------------------------------
createFormatPart() 
{
    diskDev=${1}
    echo "-----[ Create partition ${diskDev}1, Format ${diskDev}1 as ext4 ]-----"
    parted -s -a optimal ${diskDev} mklabel gpt -- mkpart primary ext4 1 -1
    mkfs.ext4 -q ${diskDev}1
    if [ $? ] ;
    then
	echo "SUCCESS, formating done."
    else
	echo "ERROR during formating!" 
    fi
}

#--------------------------------------------------------
createFormatPartInteractive() 
{
    diskDev=${1}
    doFormat="n"
    read -ei "N" -p "Create partition ${diskDev}1, Format ${diskDev}1 as ext4 ... [y|N]: " doFormat
    if [ ${doFormat}a = "ya" ] || [ ${doFormat}a = "Ya" ]; then
	### fdisl support of >2TiB drives is not sure ...
	### there can be problems and compatibility issues.
	#(echo o; echo n; echo p; echo 1; echo ; echo; echo a; echo 1; echo w) | fdisk ${diskDev}
        ### let's create GPT partition table
	parted -s -a optimal ${diskDev} mklabel gpt -- mkpart primary ext4 1 -1
	mkfs.ext4 ${diskDev}1
	if [ $? ] ; 
	then
	    echo "SUCCESS, formating done."
	else
	    echo "ERROR during formating!" 
	fi
    fi
    count=`expr ${count} + 1`
}

#--------------------------------------------------------
usage() {
    echo "Usage:" 
    echo "Setup DFN camera hdds, universal version 0.9"
    echo "  ${0} [-h|--help] | [-p|--probe] | DEVICE1 LABEL1 [DEVICE2 LABEL2] [DEVICE3 LABEL3]"
}


#----------------------------------

isDEBUG=FALSE
count=0
isProbe=FALSE
numDisks=0

#----------------------------------
# main()

if (( $# > 0 ))
then
    if [[ ${1:0:2} = "-h" || ${1:0:5} = "-help" || ${1:0:6} = "--help" ]]
    then
	usage
	exit 1
    fi
#    echo "==============================================="
    if [[ ${1:0:2} = "-p" || ${1:0:6} = "-probe" || ${1:0:7} = "--probe" ]]
    then
	if [ "${isDEBUG}" = "TRUE" ]
	then
	    echo "DEBUG: Detected command line switch -p|-probe -> probing for available disks and USB enclosure type"
	fi
	isProbe=TRUE
	shift
    fi
    if [ ${isProbe} = "FALSE" ]
    then
	## process rest of the commandline - devices and labels
	i=0
	while (( ${i} <= 2 ))
	do 
	    if (( ${#} >= 2 ))
	    then		
		if [ "${isDEBUG}" = "TRUE" ]
		then
		    echo "DEBUG Checking disk device #${i} ${1}"
		fi
		if [ -b ${1} ] 
		then
		    devices[${i}]=${1}
		    labels[${i}]=${2}
		    numDisks=$(( i + 1 ))
		    i=$(( i + 1 ))
		else
		    echo "ERROR: Disk device ${1} is not a valid block device."
		fi
		shift; shift
	    else
		break
	    fi
	done
    fi	
else 
    echo "No command line parameter detected."
    usage
    exit -1
fi


#----------------------------------
# probe devices
if [ "${isProbe}" = "TRUE" ]
then
    if [ "${isDEBUG}" = "TRUE" ]
    then
	echo "Disk devices probe:"
	lsblk
	echo "USB enclosures:"
	lsusb | egrep "JMicron|ASMedia"
    fi
else
#----------------------------------
# command line params summary print
    echo "Setting up ${numDisks} device(s)."
    i=0
    while (( ${i} < "${numDisks}" ))
    do 
	echo "Format ${devices[${i}]} as ${labels[${i}]}"
	i=$(( i + 1 ))
    done    
fi

usbEnclosures=$(lsusb | egrep "${dfn_Orico_7629_silver_USB_ID}|${dfn_AStone_USB_ID}")
if [[ "${usbEnclosures}" =~ "${dfn_Orico_7629_silver_USB_ID}" ]]
then
    isUSBJMicron=TRUE
else
    isUSBJMicron=FALSE   
fi
if [[ "${usbEnclosures}" =~ "${dfn_AStone_USB_ID}" ]]
then
    isUSBAStone=TRUE
else
    isUSBAStone=FALSE   
fi

teraDisks=$(lsblk | egrep "disk" | grep "T " | cut -f 1 -d " ")
teraDisksArray=( $teraDisks )
numTeraDisks=${#teraDisksArray[@]}

cameraType=$([[ $(hostname) =~ (DFN[a-z|A-Z]*) ]] && echo ${BASH_REMATCH[1]})

if [ "${isProbe}" = "TRUE" ]
then
    echo -n "Probe result: ${cameraType}"
    if [ "${isUSBJMicron}" = "TRUE" ]
    then
	echo -n " USB Orico"
    elif [ "${isUSBAStone}" = "TRUE" ]
    then
	echo -n " USB AStone"
    else
	echo -n " SATA"
    fi
    
    if [ "${cameraType}" = "DFNSMALL" ]
    then
	i=${numTeraDisks}
	while (( ${i} > 0 ))
	do
	    echo -n " /dev/${teraDisksArray[$(( i - 1 ))]} data$(( numTeraDisks - i + 1))"
            i=$(( i - 1 ))
	done
    fi

### just coded - needs testing!
#   if [ "${cameraType}" = "DFNKIT" ]
#   then
#	echo -n " ${teraDisksArray[$(( 0 ))]} data$1"
#   fi

### just coded - needs testing!
#   if [ "${cameraType}" = "DFNEXT" ]
#   then
#	i=0
#	while (( ${i} < ${numTeraDisks} ))
#	do
#	    echo -n " ${teraDisksArray[$(( i - 1 ))]} data${i}"
#           i=$(( i + 1 ))
#	done
#   fi
    echo ""
    exit 0
fi

#----------------------------------
# initiate short selftest 
i=0
smartctlDevType="sat"
while (( ${i} < ${numDisks} ))
do 
    echo "Initiate short SMART self test of disk ${devices[${i}]}"
    if [ "${isUSBJMicron}" = "TRUE" ]
    then 
	smartctlDevType="usbjmicron,0$(( 2 - ${labels[${i}]/"data"/} ))"
    fi
    echo "DEBUG smartctl -d ${smartctlDevType} -t short ${devices[${i}]}"
    smartctl -d ${smartctlDevType} -t short ${devices[${i}]}
    smartResult=$?
    if (( $smartResult != 0 ))
    then
	echo "ERROR: smartctl failed!"
    fi
    i=$(( i + 1 ))
done

#----------------------------------
# print disks partotions
#fdisk -l /dev/sdb /dev/sdc /dev/sdd /dev/sde /dev/sdf
#parted -l

### Anything below this point - tested only for DFNSMALL!

#----------------------------------
#createFormatPart "/dev/sdb"
#createFormatPart "/dev/sdc"
#### createFormatPart "/dev/sdd"
i=0
while (( ${i} < ${numDisks} ))
do
    createFormatPart ${devices[${i}]}
    i=$(( i + 1 ))
done

#----------------------------------
#echo "set labels"
#echo "  sdc is easier accessible, on the top, so it will be data1"
#echo "  sdb is below sdc, therefore it will be data2"
#e2label /dev/sdc1 data1
#e2label /dev/sdb1 data2
i=0
while (( ${i} < ${numDisks} ))
do
    e2label ${devices[${i}]}"1" ${labels[${i}]}
    i=$(( i + 1 ))
done

#----------------------------------
# Check fstab
#cat /etc/fstab

#----------------------------------
# echo "tune2fs configurations"
# disable external HDD fs check & continue in case of error
i=0
while (( ${i} < ${numDisks} ))
do
    tune2fs -c 0 -i 0 ${devices[${i}]}"1"
    tune2fs -e continue ${devices[${i}]}"1"
    mount "/${labels[${i}]}"
    i=$(( i + 1 ))
done

i=0
while (( ${i} < ${numDisks} ))
do
    echo "---[ listing of /${labels[${i}]} ]---------------"
    ls -l "/${labels[${i}]}"
    echo "---------------------------------------"
    i=$(( i + 1 ))
done

echo "waiting for quick smart self test to finish..."
if [ ${numDisks} -lt 2 ] ; 
then
    echo "sleep 70 seconds"
    #sleep 70
fi
if [ ${numDisks} -lt 1 ] ; 
then
    echo "sleep 70 seconds"
    #sleep 70
fi
echo "sleep 70 seconds"
#sleep 70

#----------------------------------
# print smart info

#smartctlSwitch="-d sat"

#smartctl -d usbjmicron,00 -a /dev/sdb
#echo
#read -p "Press enter to continue" dummy
#smartctl -d usbjmicron,01 -a /dev/sdb

if [ "${isUSBJMicron}" = "TRUE" ]
then
    i=0
    while (( ${i} < ${numDisks} ))
    do
	smartctl -d usbjmicron,0$(( 2 - ${labels[${i}]/"data"/} )) -a ${devices[${i}]}
	i=$(( i + 1 ))
    done
    i=0
    while (( ${i} < ${numDisks} ))
    do
	printDiskSerialNumberJmicron "/${labels[${i}]}" 0$(( 2 - ${labels[${i}]/"data"/} ))
	i=$(( i + 1 ))
    done
else
    i=0
    while (( ${i} < ${numDisks} ))
    do
	smartctl -d sat -a ${devices[i]}
	i=$(( i + 1 ))
    done 
    i=0
    while (( ${i} < ${numDisks} ))
    do
	printDiskSerialNumber "/data"${i}
	i=$(( i + 1 ))	
    done 
fi
    
df -h | egrep "Filesystem|data"

i=0
while (( ${i} < ${numDisks} ))
do
    umount "/${labels[${i}]}"
    i=$(( i + 1 ))
done

echo "------------------"
echo " This is THE END! "
echo "------------------"
