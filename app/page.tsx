"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Address } from "@/types/address";
import { AddAddressDialog } from "@/components/address-dialog";
import { AddressCard } from "@/components/address-card";

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveAddress = (address: Address) => {
    setAddresses((prev) => {
      if (address.isDefault) {
        return prev
          .map((a) => ({ ...a, isDefault: false }))
          // @ts-ignore
          .concat({ ...address, id: Date.now().toString() });
      }
      return [...prev, { ...address, id: Date.now().toString() }];
    });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const filteredAddresses = addresses.filter(
    (address) =>
      address.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.lotNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center w-full mb-6">
          <h1 className="text-2xl font-semibold">Zé Interplanetário🌍</h1>
        </div>

        <div className="flex flex-col md:flex-row w-full items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-10"
              placeholder="Pesquise o endereço aqui"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddAddressDialog onSave={handleSaveAddress} />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500">
            Lista de Endereços
          </h2>
          {filteredAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={() => handleDeleteAddress(address.id)}
              onEdit={(updatedAddress) => {
                setAddresses((prev) =>
                  prev.map((a) =>
                    a.id === address.id
                      ? { ...updatedAddress, id: address.id }
                      : a
                  )
                );
              }}
            />
          ))}
          {filteredAddresses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum endereço encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
