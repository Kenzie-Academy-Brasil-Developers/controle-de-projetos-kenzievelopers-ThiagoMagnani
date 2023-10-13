CREATE TABLE IF NOT EXISTS "developers" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TYPE "OS" AS ENUM ('Windows', 'Linux', 'MacOS');

CREATE TABLE IF NOT EXISTS "developerInfos" (
    id SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferredOS" "OS" NOT NULL,
    "developerId" INTEGER UNIQUE NOT NULL,
    CONSTRAINT "fk_developerId"
    FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "projects" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    repository VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerId" INTEGER,
    CONSTRAINT "fk_developerId"
    FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE RESTRICT
);

-- Colar no psql
SELECT * FROM "developerInfos" AS di
JOIN "developers" d ON di.developerId = d.id;

SELECT * FROM projects AS p
JOIN developers d ON p.developerId = d.id;
