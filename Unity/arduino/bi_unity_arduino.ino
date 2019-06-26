const byte led = 13; 
const byte pot = A0;
const int delayTime = 50;
unsigned long targetTime = 0; 

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(9600);
}

void loop() {
  if(millis() > targetTime + delayTime){
    if(Serial.availableForWrite()){
      int value = analogRead(pot);
      Serial.flush();
      Serial.println(value);
      targetTime = millis();
    }
  }
}

void serialEvent() {
  while (Serial.available()) {
    char fromUnity = (char)Serial.read();
    if(fromUnity == '0'){
      digitalWrite(led, LOW);
    }
    else if(fromUnity == '1'){
      digitalWrite(led, HIGH);
    }
  }
}
