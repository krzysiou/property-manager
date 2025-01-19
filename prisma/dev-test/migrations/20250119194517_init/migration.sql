-- CreateTable
CREATE TABLE "WeatherData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "observationTime" TEXT NOT NULL,
    "temperature" REAL NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "windSpeed" REAL NOT NULL,
    "windDegree" REAL NOT NULL,
    "windDir" TEXT NOT NULL,
    "pressure" REAL NOT NULL,
    "precip" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "cloudcover" REAL NOT NULL,
    "feelslike" REAL NOT NULL,
    "uvIndex" REAL NOT NULL,
    "visibility" REAL NOT NULL,
    "propertyId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,
    "weatherDataId" TEXT NOT NULL,
    CONSTRAINT "Property_weatherDataId_fkey" FOREIGN KEY ("weatherDataId") REFERENCES "WeatherData" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_propertyId_key" ON "WeatherData"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_weatherDataId_key" ON "Property"("weatherDataId");
