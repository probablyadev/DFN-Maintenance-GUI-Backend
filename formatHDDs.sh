#!/usr/bin/expect

spawn ~/bin/setup_usb_hdds_jmicron.sh

set install [lindex $argv 0]
set data1 [lindex $argv 1]
set data2 [lindex $argv 2]

expect {Install parted & gparted \[y|N\]:}
send "$install\n"
expect {/dev/sdb1 as ext4 ... \[y|N\]:}
send "$data1\n"
expect {/dev/sdc1 as ext4 ... \[y|N\]:}
send "$data2\n"

interact