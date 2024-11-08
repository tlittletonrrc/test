import ctypes
from time import sleep

def beep_buzzer():
    # Trigger a system alert sound
    ctypes.windll.user32.MessageBeep(0xFFFFFFFF)
    sleep(0.5)

# Beep 5 times
for _ in range(5):
    beep_buzzer()

print("test")
