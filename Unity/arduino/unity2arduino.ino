const byte led = 13; 

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char fromUnity = Serial.read();
    if(fromUnity == '0'){
      digitalWrite(led, LOW);
    }
    else if(fromUnity == '1'){
      digitalWrite(led, HIGH);
    }
  }

}
