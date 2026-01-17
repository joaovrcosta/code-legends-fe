import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Fire, Plus, TicketIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import genesisBackground from "../../../public/image 14.png";

export function NewsBanner() {
    return (
        <>
            <div className="bg-gray-gradient border border-[#25252A] rounded-[16px] mb-4 flex max-h-[400px] lg:h-full overflow-hidden shadow-xl min-w-0 w-full">
                {/* Lado esquerdo */}
                <div className="relative lg:px-5 px-4 lg:pb-8 pb-4 lg:pt-5 pt-2 flex flex-col justify-between">
                    {/* Fade direito */}
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#121214] to-transparent z-10" />

                    <div>
                        <div className="mb-8 w-fit">
                            <div className="flex items-center gap-2 bg-transparent text-[#737373] border border-[#737373] text-xs font-medium px-3 py-1 rounded-full w-fit">
                                <Fire weight="fill" color="#891B1B" /> AO VIVO
                            </div>
                        </div>
                        <h3 className="text-[20px] mb-2">Bom dia, dev!</h3>
                        <p className="text-muted-foreground text-[14px]">
                            Aprenda a programar do zero, partindo dos princípios da web até
                            criação de aplicações frontend e backend.
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mt-6">
                            <div className="flex text-xs items-center gap-2">
                                <Avatar className="h-[24px] w-[24px]">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?s=400&u=415dc8fde593b5dcbdef181e6186a8d80daf72fc&v=4" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>João Victor</p>
                            </div>
                            <div className="flex text-xs gap-2">
                                <p className="text-muted-foreground">Curso</p>
                                <p className="text-green-500">Para Iniciantes</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <Button className="bg-blue-gradient-500 text-white h-[42px] rounded-full hover:bg-slate-200 border border-[#25252A] hover:text-black">
                                <TicketIcon size={32} weight="fill" />
                                Retirar meu ingresso
                            </Button>
                            <Button className="h-[44px]  bg-[#1a1a1e] rounded-full w-fit">
                                <Plus size={32} />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Lado direito */}

                <div className="flex-shrink-0 lg:w-[50%] w-[0%] h-full relative">
                    {/* Fade esquerda */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#121214] to-transparent z-10" />

                    <Image
                        src={genesisBackground}
                        alt=""
                        className="h-full w-full object-cover object-center rounded-r-[16px] lg:block hidden"
                    />
                </div>
            </div>
        </>
    );
}
