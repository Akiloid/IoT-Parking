# IoT-Parking

Fully functional Smart Parking system where the setup has two gates for entry and exit which are basically pieces of cardboard and each of these are attached to a servo motor.
- parking spaces have a respective IR sensor which would be responsible for indicating whether the space is filled or not
- servo motors and IR sensors connected to an esp8266 which sends and recieves the data from [Adafruit.Io](http://Adafruit.Io) using an MQTT protocol.
- On entry, raspberry pi camera module which is connected to a raspberry Pi near the entrance, takes a picture of the number plate and sends the picture to a PC in the local network
- PC has a code which run OpenCV to filter the image which makes it easier for the Tesseract OCR to extract the text in the numberplate
- PC then sends the number plate along with a timestamp into a MongoDB database.
- During exit, camera reads the number plate again, and the code checks in the database, calculates the bill based on the difference between the entry and the current time and then converts that into a QR code and displays it on the screen and this is where the front end part comes and which my friend worked on.
- made an app of our own which uses a wallet system and it has a QR code scanner and after you scan it, it automatically deducts the the amount from the remaining balance in your wallet and once this transaction happens, the flag in Adafruit io turned on and the esp8266 is subscribed to the topic so it keeps reading from it and once it sees that the flag is 1 it actuates the exit servo motor to turn on. 
