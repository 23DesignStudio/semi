#define D_SENSOR 36

void setup() {
  pinMode(D_SENSOR, INPUT);
  Serial.begin(9600);
  Serial.println("...start...");

}

void loop() {
  int value = digitalRead(D_SENSOR);
  Serial.print("Sensor: ");
  Serial.println(value);
  delay(1000);

}
