#define OC 8

void setup()
{
  pinMode(OC, OUTPUT);
  digitalWrite(OC, 1);
  
}

void loop()
{
  digitalWrite(OC, 1);
  delay(1000);
  digitalWrite(OC, 0);
  delay(1000);
  
}
