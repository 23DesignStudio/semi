const byte pot = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if(Serial.availableForWrite()){
    int value = analogRead(pot);
    delay(50);
    Serial.flush();
    Serial.println(value);
  }
}
