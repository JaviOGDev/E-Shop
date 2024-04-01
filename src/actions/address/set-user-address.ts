"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: address,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Could not save address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    console.log({ userId });

    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addresToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addresToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addresToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("Could not save address");
  }
};
