#!/usr/bin/expect

spawn ~/bin/setup_usb_hdds_jmicron.sh

expect {Install parted & gparted \[y|N\]:}
send "N\n"
expect {/dev/sdb1 as ext4 ... \[y|N\]:}
send "N\n"
expect {/dev/sdc1 as ext4 ... \[y|N\]:}
send "N\n"

interact