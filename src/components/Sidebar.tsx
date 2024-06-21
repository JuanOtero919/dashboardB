"use client";

import {
  Inbox,
  BookOpenCheck,
  FileText,
  Cpu
} from "lucide-react";
import UserItem from "./UserItem";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import Link from "next/link";
import Logout from "./Logout";

export default function Sidebar() {
  const menuList = [
    {
      group: "Procesos [Admin]",
      items: [
        {
          link: "/structure",
          icon: <Cpu />,
          text: "Esquemas",
        },
        {
          link: "/assignations",
          icon: <Inbox />,
          text: "Asignaciones",
        },
      ],
    },
    {
      group: "Evaluaciones [Docentes]",
      items: [
        {
          link: "/evaluations",
          icon: <BookOpenCheck />,
          text: "Evaluaciones",
        },
      ],
    },
    {
      group: "Mis procesos [Estudiante]",
      items: [
        {
          link: "/process",
          icon: <FileText />,
          text: "Procesos Activos",
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
      <Logout />
    </div >
  );
}
