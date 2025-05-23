import {
  BellIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  LayoutGridIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  WalletIcon,
  Undo2Icon,
  Redo2Icon,
  Type as TextIcon,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import CardEditor from "../../components/CardEditor";

// Navigation menu items data
const navigationItems = [
  { icon: <HomeIcon className="w-6 h-6" />, label: "Home", active: false },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    label: "My Gallery",
    active: false,
  },
  {
    icon: <LayoutGridIcon className="w-6 h-6" />,
    label: "Templates",
    active: true,
  },
  {
    icon: <SettingsIcon className="w-6 h-6" />,
    label: "Settings",
    active: false,
  },
  {
    icon: <HelpCircleIcon className="w-6 h-6" />,
    label: "FAQs",
    active: false,
  },
];

// Editor tools data
const editorTools = [
  { icon: "/material-symbols-light-draw-outline-rounded.svg", label: "Draw" },
  { icon: "/circum-text.svg", label: "Text", action: "text" },
  { icon: "/bytesize-upload.svg", label: "Upload" },
  { icon: "/tabler-background.svg", label: "Background" },
  { icon: "/ri-shapes-line.svg", label: "Elements" },
  { icon: "/carbon-template.svg", label: "Templates" },
];

// Card backgrounds
const cardBackgrounds = [
  "/mask-group.png",
  "/paper-4.png",
  "/mask-group-1.png",
];

export const GreetingCardEditor = (): JSX.Element => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const cardEditorRef = useRef<{ toggleTextEditor: () => void }>(null); // Ref to access CardEditor methods

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[242px] h-full bg-white border-r border-gray-100 flex flex-col">
        <div className="p-10">
          <img
            className="w-32 h-[25px]"
            alt="Full logo teal"
            src="/full-logo--teal--2-1.png"
          />
        </div>

        <nav className="flex flex-col gap-5 px-6 mt-8">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full justify-start ${
                item.active ? "bg-[#00b2c71a]" : ""
              }`}
            >
              {item.icon}
              <span
                className={`font-big-body-this-is-a-big-body-text-medium text-[length:var(--big-body-this-is-a-big-body-text-medium-font-size)] leading-[var(--big-body-this-is-a-big-body-text-medium-line-height)] ${
                  item.active ? "text-neutral-6" : "text-neutral-4"
                }`}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </nav>

        <div className="mt-auto px-6 mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-[11px] px-5 py-4 rounded-xl w-full justify-start"
          >
            <LogOutIcon className="w-6 h-6" />
            <span className="text-neutral-5 font-big-body-this-is-a-big-body-text-medium text-[length:var(--big-body-this-is-a-big-body-text-medium-font-size)] leading-[var(--big-body-this-is-a-big-body-text-medium-line-height)]">
              Logout
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-[100px] bg-white border border-solid border-gray-50 flex items-center px-10">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-4 bg-[#f7f7f7] rounded-lg w-[494px] justify-start"
            >
              <SearchIcon className="w-5 h-5" />
              <span className="text-neutral-4 font-small-body-this-is-a-small-body-text-medium text-[length:var(--small-body-this-is-a-small-body-text-medium-font-size)] leading-[var(--small-body-this-is-a-small-body-text-medium-line-height)]">
                Search for a greeting card template...
              </span>
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-4 bg-[#f7f7f7] rounded-lg"
              >
                <img
                  className="w-6 h-6 object-cover"
                  alt="User avatar"
                  src="/ellipse-7.svg"
                />
                <span className="text-neutral-5 font-small-body-this-is-a-small-body-text-medium text-[length:var(--small-body-this-is-a-small-body-text-medium-font-size)] leading-[var(--small-body-this-is-a-small-body-text-medium-line-height)]">
                  snowolohijere
                </span>
              </Button>
              <Button variant="ghost" className="p-3 bg-[#f7f7f7] rounded-lg">
                <WalletIcon className="w-7 h-7" />
              </Button>
              <Button variant="ghost" className="p-3 bg-[#f7f7f7] rounded-lg">
                <BellIcon className="w-7 h-7" />
              </Button>
            </div>
          </div>
        </header>

        {/* Editor Area */}
        <main className="flex-1 p-8">
          <Card className="w-[1061px] h-[838px] rounded-2xl overflow-hidden">
            <CardContent className="p-0 relative h-full">
              {/* Left Toolbar */}
              <div className="absolute top-8 left-6 flex flex-col items-center gap-10">
                <Button
                  variant="secondary"
                  className="flex flex-col w-[35px] h-9 items-center justify-center p-1 bg-teal rounded-lg"
                >
                  <img
                    className="w-[14.29px] h-[13.46px]"
                    alt="Union"
                    src="/union.svg"
                  />
                </Button>

                

                <div className="flex flex-col items-center gap-[34px]">
                  {editorTools.map((tool, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="flex flex-col items-center gap-0.5 p-0"
                      onClick={() => {
                        if (tool.action === "text" && cardEditorRef.current?.toggleTextEditor) {
                          cardEditorRef.current.toggleTextEditor();
                        }
                      }}
                    >
                      <img className="w-9 h-9" alt={tool.label} src={tool.icon} />
                      <span className="text-neutral-6 font-smallest-body-this-is-a-smallest-body-text-regular text-[length:var(--smallest-body-this-is-a-smallest-body-text-regular-font-size)] text-center leading-[var(--smallest-body-this-is-a-smallest-body-text-regular-line-height)]">
                        {tool.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Undo/Redo Controls */}
              <div className="absolute top-[30px] left-[134px] flex items-center justify-between w-[94px]">
                <Button variant="ghost" className="p-0">
                  <Undo2Icon className="w-9 h-9" />
                </Button>
                <Button variant="ghost" className="p-0">
                  <Redo2Icon className="w-9 h-9" />
                </Button>
              </div>

              {/* Editor Title */}
              <div className="absolute top-[33px] left-[437px] text-neutral-5 font-big-body-this-is-a-big-body-text-medium text-[length:var(--big-body-this-is-a-big-body-text-medium-font-size)] text-center leading-[var(--big-body-this-is-a-big-body-text-medium-line-height)]">
                Greeting Card Editor
              </div>

              {/* Generate Button */}
              <Button className="absolute top-6 left-[877px] bg-teal rounded-xl">
                <span className="text-neutral-6 font-small-body-this-is-a-small-body-text-medium text-[length:var(--small-body-this-is-a-small-body-text-medium-font-size)] text-center leading-[var(--small-body-this-is-a-small-body-text-medium-line-height)]">
                  Generate Card
                </span>
              </Button>

                {/* Card Preview with Dynamic Background */}
              <div className="flex flex-col w-[412px] items-center gap-16 absolute top-[130px] left-[324px]">
                {/* Main Card */}
                <div
                  className="relative w-[407px] h-[417px] bg-neutral-50 rounded-[20px] overflow-hidden"
                >
                  <div className="relative w-[352px] h-[350px] top-[34px] left-[28px] bg-[#d2c6b4] rounded-2xl overflow-hidden">
                    <CardEditor 
                      backgroundImages={cardBackgrounds}
                      ref={cardEditorRef}
                    />
                  </div>
                  
                  {/* Text editor is now handled directly by the ImageEditor component */}
                </div>

                {/* Card Thumbnails */}
                <div className="flex items-center gap-4 self-stretch">
                  {cardBackgrounds.map((bg, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`relative w-[200px] h-[180px] p-0 ${
                        currentBackground === index ? "ring-2 ring-teal" : ""
                      }`}
                      onClick={() => setCurrentBackground(index)}
                    >
                      <div
                        className="w-full h-full rounded-2xl"
                        style={{
                          backgroundImage: `url(${bg})`,
                          backgroundSize: "100% 100%",
                        }}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};
