//GY-61 demo
#define XAXIS A0
#define YAXIS A1
#define ZAXIS A2
int sentData[] = {0, 0, 0};
void setup() {
  analogReference(EXTERNAL);
  pinMode(XAXIS, INPUT);
  pinMode(YAXIS, INPUT);
  pinMode(ZAXIS, INPUT);
  Serial.begin(9600);
  delay(2000);
}

void loop() {
  int x = analogRead(XAXIS);
  int y = analogRead(YAXIS);
  int z = analogRead(ZAXIS);

  if(abs(x - sentData[0]) > 2 
      || abs(y - sentData[1] > 2) 
      || abs(z - sentData[2]) > 2){
    String sendLine = "";
    sendLine += String(x);
    sendLine += ',';
    sendLine += String(y);
    sendLine += ',';
    sendLine += String(z);
    sentData[0] = x;
    sentData[1] = y;
    sentData[2] = z;
    Serial.println(sendLine);
    delay(20);
  }
}
