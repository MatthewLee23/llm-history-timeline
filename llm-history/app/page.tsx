"use client";
import { useChat } from "ai/react";
import { Bot, Loader, Loader2, Send, User2 } from "lucide-react";
import Image from "next/image";
import Markdown from "../app/component/markdown";
import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/llm-response",
    });
    const eras = [
      {
        title: "Prehistory",
        dateRange: "c. 3 million years ago - c. 3000 BCE",
        figures: ["Lucy", "Homo habilis", "Homo erectus"]
      },
      {
        title: "Paleolithic",
        dateRange: "c. 3.3 million years ago - c. 10,000 BCE",
        figures: ["Neanderthal", "Cro-Magnon"]
      },
      {
        title: "Mesolithic",
        dateRange: "c. 15,000 - c. 5,000 BCE",
        figures: ["Natufian culture", "Hunter-Gatherers"]
      },
      {
        title: "Neolithic",
        dateRange: "c. 10,200 - c. 3,000 BCE",
        figures: ["Ötzi the Iceman"]
      },
      {
        title: "Bronze Age",
        dateRange: "c. 3,300 - c. 1,200 BCE",
        figures: ["Narmer", "Hammurabi", "Tutankhamun"]
      },
      {
        title: "Iron Age",
        dateRange: "c. 1,200 BCE - c. 550 CE",
        figures: ["Homer", "Confucius", "Buddha"]
      },
      {
        title: "Classical Antiquity",
        dateRange: "8th century BCE - 6th century CE",
        figures: ["Socrates", "Plato", "Aristotle", "Julius Caesar", "Augustus"]
      },
      {
        title: "Middle Ages",
        dateRange: "5th - 15th century CE",
        figures: ["Charlemagne", "William the Conqueror", "Genghis Khan", "Joan of Arc"]
      },
      {
        title: "Early Modern Period",
        dateRange: "15th - 18th century CE",
        figures: ["Leonardo da Vinci", "Christopher Columbus", "William Shakespeare", "Isaac Newton"]
      },
      {
        title: "Contemporary History",
        dateRange: "1945 - Present",
        figures: ["Albert Einstein", "Martin Luther King Jr.", "Nelson Mandela", "Steve Jobs"]
      }
    ]
  return (
    <div className="w-full p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">World History Timeline</h1>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Interact with World History by asking questions about periods/events OR ask to speak with certain historical figures</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex p-4 space-x-4">
          {eras.map((era, index) => (
            <Card key={index} className="w-[300px] flex-shrink-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{era.title}</CardTitle>
                <p className="text-sm text-gray-600">{era.dateRange}</p>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2 text-gray-700">Key Figures:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {era.figures.map((figure, figIndex) => (
                    <li key={figIndex}>
                      <Link href={`/chat/${figure.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-600 hover:underline">
                        {figure}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    
    <main className="flex min-h-screen flex-col items-center p-12 text-black">
      {/* form element */}
      {RenderForm()}
      {RenderMessages()}
      {/* rendering messages */}
    </main>
    </div>
  );

  // inner render functions
  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : "ask something . . . "}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent"
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-stone-500" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
        {messages.map((m, index) => {
          return (
            <div
              className={`p-4 shadow-md rounded-md ml-10 relative ${
                m.role === "user" ? "bg-stone-300" : ""
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg" />
              ) : (
                <Bot
                  className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                    isLoading && index === messages.length - 1
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
