/*
  Warnings:

  - The primary key for the `check_ins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `checkInId` on the `check_ins` table. All the data in the column will be lost.
  - The primary key for the `gyms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gymId` on the `gyms` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - The required column `checkIn_id` was added to the `check_ins` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `gym_id` was added to the `gyms` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_pkey",
DROP COLUMN "checkInId",
ADD COLUMN     "checkIn_id" TEXT NOT NULL,
ADD CONSTRAINT "check_ins_pkey" PRIMARY KEY ("checkIn_id");

-- AlterTable
ALTER TABLE "gyms" DROP CONSTRAINT "gyms_pkey",
DROP COLUMN "gymId",
ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD CONSTRAINT "gyms_pkey" PRIMARY KEY ("gym_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");
