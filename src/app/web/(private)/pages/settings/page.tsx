"use client"

import Sidebar from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken"

export default function ConfiguracoesPage() {

  useCheckTokenValidity();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-8 pl-32 transition-all duration-300 ease-in-out">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Preferências</h1>

            <section className="space-y-4 border-b pb-6">
              <h2 className="text-lg font-semibold">Aparência</h2>
              <p className="text-sm text-gray-500">Customize como o Space aparece em seu dispositivo.</p>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tema</label>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-[180px] bg-white border border-gray-300">
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="light" className="hover:bg-gray-100">Claro</SelectItem>
                    <SelectItem value="dark" className="hover:bg-gray-100">Escuro</SelectItem>
                    <SelectItem value="system" className="hover:bg-gray-100">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="space-y-6 border-b pb-6">
              <h2 className="text-lg font-semibold">Linguagem e Hora</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Linguagem</label>
                    <p className="text-sm text-gray-500">Altere a linguagem utilizada na interface do usuário.</p>
                  </div>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger className="w-[180px] bg-white border border-gray-300">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300">
                      <SelectItem value="pt-BR" className="hover:bg-gray-100">Português - Brasil</SelectItem>
                      <SelectItem value="en-US" className="hover:bg-gray-100">English - US</SelectItem>
                      <SelectItem value="es" className="hover:bg-gray-100">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Fuso horário</label>
                    <p className="text-sm text-gray-500">Configuração atual de fuso horário.</p>
                  </div>
                  <Select defaultValue="SP">
                    <SelectTrigger className="w-[180px] bg-white border border-gray-300">
                      <SelectValue placeholder="Selecione o fuso" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300">
                      <SelectItem value="SP" className="hover:bg-gray-100">(GMT - 3:00) - São Paulo</SelectItem>
                      <SelectItem value="NY" className="hover:bg-gray-100">(GMT - 4:00) - New York</SelectItem>
                      <SelectItem value="LDN" className="hover:bg-gray-100">(GMT + 0:00) - London</SelectItem>
                      <SelectItem value="TKY" className="hover:bg-gray-100">(GMT + 9:00) - Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-semibold">Notificações</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Notificações em dispositivos móveis</label>
                    <p className="text-sm text-gray-500">Ative para receber notificações no seu dispositivo móvel</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-black"/>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Notificações por email</label>
                    <p className="text-sm text-gray-500">Ative para receber notificações por email.</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-black" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}