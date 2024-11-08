import winsound
from time import sleep

def beep_buzzer():
    # Generate a beep sound at 1000 Hz frequency for 500 ms
    winsound.Beep(1000, 500)  # Beep at 1000 Hz for 500 milliseconds
    sleep(0.5)  # Wait for half a second

# Beep the buzzer 5 times
for _ in range(5):
    beep_buzzer()
