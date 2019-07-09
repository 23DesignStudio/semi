#define LED 2

bool ledState = false;
void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    // read the incoming byte:
    char incomingByte = (char)Serial.read();
    if(incomingByte == 'a'){
      ledState = !ledState;
      digitalWrite(LED, ledState);
    }
  }

}
