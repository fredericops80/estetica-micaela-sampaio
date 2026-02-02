-- CreateTable
CREATE TABLE "HeroConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "subtitle" TEXT NOT NULL,
    "subtitleColor" TEXT NOT NULL,
    "titlePrefix" TEXT NOT NULL,
    "titleHighlight" TEXT NOT NULL,
    "titleSuffix" TEXT NOT NULL,
    "titleColor" TEXT NOT NULL,
    "highlightColor" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL,
    "ctaColor" TEXT NOT NULL,
    "ctaTextColor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
