"use client"

import React from "react";
import { useMainStore } from "@/store/MainStore";
import Image from "next/image";

function Shortcuts() {
    const [shortcuts] = useMainStore((state) => [state.shortcuts])
    return (
        <div className="w-full grid grid-cols-5 gap-4 px-4 md:grid-cols-10 lg:gap-6 max-w-[960px] mx-auto">
            {shortcuts.map((item) => {
                return (
                    <div
                        key={item.mainShortcutId}
                        className="flex flex-col gap-2 cursor-pointer"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={60}
                            height={60}
                        />
                        <span className="font-normal text-xs">{item.title}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Shortcuts;
