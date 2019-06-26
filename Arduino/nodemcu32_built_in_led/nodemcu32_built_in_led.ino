#define LED 2
 
void setup() {
  pinMode(LED,OUTPUT);
  Serial.begin(115200);
}
 
void loop() {
  delay(1000);
  digitalWrite(LED,HIGH);
  Serial.println("LED is on");
  delay(1000);
  Serial.println("LED is off");
  digitalWrite(LED,LOW);
}
