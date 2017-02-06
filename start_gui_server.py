import subprocess
import atexit

def exitRoutine():
    p.kill()

p = subprocess.call(["python", "/opt/dfn-software/GUI/server.py"], cwd="/opt/dfn-software/GUI")
atexit.register(exitRoutine)




