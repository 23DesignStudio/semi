#define LED 13
bool isReady = false;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
  while(!isReady){
    if(Serial.available() > 0){
      char data = Serial.read();
      if(data == 's'){
        isReady = true;
      }
    }
  }
}

void loop() {
  if(Serial.available() > 0){
    char data = Serial.read();
    if(data == '0'){
      digitalWrite(LED, 0);
    }
    if(data == '1'){
      digitalWrite(LED, 1);
    }
  }
}
