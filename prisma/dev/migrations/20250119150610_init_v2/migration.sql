-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
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
INSERT INTO "new_Property" ("city", "creationDate", "id", "lat", "lon", "state", "street", "weatherDataId", "zipCode") SELECT "city", "creationDate", "id", "lat", "lon", "state", "street", "weatherDataId", "zipCode" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE UNIQUE INDEX "Property_weatherDataId_key" ON "Property"("weatherDataId");
CREATE TABLE "new_WeatherData" (
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
INSERT INTO "new_WeatherData" ("cloudcover", "feelslike", "humidity", "id", "observationTime", "precip", "pressure", "propertyId", "temperature", "uvIndex", "visibility", "weatherCode", "windDegree", "windDir", "windSpeed") SELECT "cloudcover", "feelslike", "humidity", "id", "observationTime", "precip", "pressure", "propertyId", "temperature", "uvIndex", "visibility", "weatherCode", "windDegree", "windDir", "windSpeed" FROM "WeatherData";
DROP TABLE "WeatherData";
ALTER TABLE "new_WeatherData" RENAME TO "WeatherData";
CREATE UNIQUE INDEX "WeatherData_propertyId_key" ON "WeatherData"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
