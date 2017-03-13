#!/bin/bash
### BEGIN INIT INFO
# Provides:          web gui server
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Should-Start:      
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: DFN camera web gui server
# Description:       Starts the DFN camera web gui server
### END INIT INFO

logFileDir=/data0/log/GUI
logFile=${logFileDir}/web_gui_`date -u +%Y-%m-%d_%H%M%S`UTC.log
errLogFile=${logFileDir}/web_gui_`date -u +%Y-%m-%d_%H%M%S`UTC_err.log

PATH=/usr/local/bin:/sbin:/bin:/usr/bin:/usr/sbin

prg=/opt/dfn-software/GUI/web_gui_server.py
pidfile=/var/run/gui_server.pid

[ ! -d ${logFileDir} ] && mkdir ${logFileDir}

if [ ! -e ${prg} ]
then
    echo "${prg} not found!"
    exit 0
fi

. /lib/init/vars.sh
. /lib/lsb/init-functions
[ -r /etc/default/rcS ] && . /etc/default/rcS
  
# Are we running from init?
run_by_init() {
    ([ "$previous" ] && [ "$runlevel" ]) || [ "$runlevel" = S ]
}

RET=0

case "$1" in
  start)
	if [ $UID -ne 0 ]
	then
	    echo "You must be root to do this..." 
	    exit 4
	fi
	echo "Starting DFN camera web gui..." 
	if [ -e ${pidfile} ] 
	then
	    echo "Warning: pid file ${pidfile} already exists"
	fi
	/usr/bin/python ${prg} >${logFile} 2>${errLogFile} &
	### MCU note : returns 0 even if ${prg} not found.
	RET=$?
	sleep 1
	prg_pid=`ps aux | grep "${prg}" | grep python | cut -c 10-14`
	log_daemon_msg "Started DFN camera web gui" "" || true
        ### if [ $RET = 0 ] 
        if [ ! -z "${prg_pid}" ] 
	then
	    echo ${prg_pid} > ${pidfile}
            log_end_msg 0 || true
        else
	    log_end_msg 1 || true
        fi

	;;
  restart|reload|force-reload)
	$0 stop
	$0 start
	exit 3
	;;
  stop)
	if [ $UID -ne 0 ]
	then
	    echo "You must be root to do this..." 
	    exit 4
	fi
        log_daemon_msg "Stopping  DFN camera web gui..." "" || true
#	prg_pid=`pidof ${prg}`
	prg_pid=`ps aux | grep "${prg}" | grep python | cut -c 10-14`
	if [ -z "${prg_pid}" ] 
	then
	    echo -n " not running "
	    RET=1
	else
	    kill -TERM ${prg_pid}
	    RET=$?
	fi
	    
        if [ $RET = 0 ] 
	then
            log_end_msg 0 || true
        else
            log_end_msg 1 || true
        fi
	rm -rf ${pidfile}
	;;
  status)
	#	if pidof ${prg} >/dev/null; then
	prg_pid=`ps aux | grep "${prg}" | grep python | cut -c 10-14`
	if [ -z "${prg_pid}" ] 
	then
	    echo "${prg} is not running."
	    RET=1
	else
	    echo "${prg} is running."
	fi
	;;
  *)
	echo "Usage: $0 [start|stop|restart|status]" >&2
	exit 3
	;;
esac

exit $RET
