"use client";

import {
  BellIcon,
  Cookie,
  CreditCard,
  Inbox,
  MessageSquare,
  Settings,
  User,
  BookOpenCheck,
  FileText,
  Cpu
} from "lucide-react";
import UserItem from "./UserItem";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import Link from "next/link";

export default function Sidebar() {
  const menuList = [
    {
      group: "Procesos [Admin]",
      items: [
        {
          link: "/structure",
          icon: <Cpu />,
          text: "Esquema",
        },
        {
          link: "/assignations",
          icon: <Inbox />,
          text: "Asignacion",
        },
      ],
    },
    {
      group: "Evaluaciones [Docentes]",
      items: [
        {
          link: "/evaluations",
          icon: <BookOpenCheck />,
          text: "Evaluacion",
        },
      ],
    },
    {
      group: "Mis procesos [Estudiante]",
      items: [
        {
          link: "/process",
          icon: <FileText />,
          text: "Proceso Activo",
        },
      ],
    },
  ];

  return (
    <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                <Link href={option.link} key={optionKey} passHref>
                  <CommandItem
                    key={optionKey}
                    className="flex gap-2 cursor-pointer"
                  >
                    {option.icon}
                    {option.text}
                  </CommandItem>
                </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <Link href='/team' className="flex items-center gap-2">
        <Settings />
        <span> Team Setting</span>
      </Link>
    </div>
  );
}
