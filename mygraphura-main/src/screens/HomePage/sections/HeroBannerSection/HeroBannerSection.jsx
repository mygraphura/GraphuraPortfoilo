// Brand card data
const brandCards = [
  {
    id: "graphobot",
    name: "GraphoBot",
    description: "AI-powered chatbot for business automation.",
    category: "AI & Web Dev",
    bg: "#0f0a2d",
    badgeBg: "#8c60f21f",
    badgeBorder: "#8c60f240",
    badgeText: "#8c60f2d9",
    gradientColor1: "rgba(140,97,242,0.22)",
    gradientColor2: "rgba(140,97,242,0)",
    gradientColor3: "rgba(140,97,242,0.12)",
    gradientColor4: "rgba(140,97,242,0)",
    nameSize: "text-[22px]",
    gridArea: "graphobot",
  },
  {
    id: "gcrown",
    name: "G Crown Jewellery",
    description: null,
    category: "CRM Platform",
    bg: "#0a1133",
    badgeBg: "#3399f91f",
    badgeBorder: "#3399f940",
    badgeText: "#3399f9d9",
    gradientColor1: "rgba(51,153,250,0.22)",
    gradientColor2: "rgba(51,153,250,0)",
    gradientColor3: "rgba(51,153,250,0.12)",
    gradientColor4: "rgba(51,153,250,0)",
    nameSize: "text-[17px]",
    gridArea: "gcrown",
  },
  {
    id: "hotelshivganga",
    name: "Hotel Shiv Ganga",
    description: null,
    category: "Hospitality",
    bg: "#0a2314",
    badgeBg: "#38d8721f",
    badgeBorder: "#38d87240",
    badgeText: "#38d872d9",
    gradientColor1: "rgba(56,217,115,0.22)",
    gradientColor2: "rgba(56,217,115,0)",
    gradientColor3: "rgba(56,217,115,0.12)",
    gradientColor4: "rgba(56,217,115,0)",
    nameSize: "text-[17px]",
    gridArea: "hotelshivganga",
  },
  {
    id: "logo1",
    name: "Logo",
    description: null,
    category: "Web Dev",
    bg: "#0a1e14",
    badgeBg: "#38e08c1f",
    badgeBorder: "#38e08c40",
    badgeText: "#38e08cd9",
    gradientColor1: "rgba(56,224,140,0.22)",
    gradientColor2: "rgba(56,224,140,0)",
    gradientColor3: "rgba(56,224,140,0.12)",
    gradientColor4: "rgba(56,224,140,0)",
    nameSize: "text-[17px]",
    gridArea: "logo1",
  },
  {
    id: "fruitbounty",
    name: "Fruit Bounty",
    description: "Complete brand identity for a bold market entry.",
    category: "Branding & Design",
    bg: "#281107",
    badgeBg: "#f993261f",
    badgeBorder: "#f9932640",
    badgeText: "#f99326d9",
    gradientColor1: "rgba(250,148,38,0.22)",
    gradientColor2: "rgba(250,148,38,0)",
    gradientColor3: "rgba(250,148,38,0.12)",
    gradientColor4: "rgba(250,148,38,0)",
    nameSize: "text-[22px]",
    gridArea: "fruitbounty",
  },
  {
    id: "abcd",
    name: "Abcd",
    description: "Data-driven campaigns that convert.",
    category: "Digital Marketing",
    bg: "#1e0a33",
    badgeBg: "#e047ad1f",
    badgeBorder: "#e047ad40",
    badgeText: "#e047add9",
    gradientColor1: "rgba(224,71,173,0.22)",
    gradientColor2: "rgba(224,71,173,0)",
    gradientColor3: "rgba(224,71,173,0.12)",
    gradientColor4: "rgba(224,71,173,0)",
    nameSize: "text-[22px]",
    gridArea: "abcd",
  },
  {
    id: "logo2",
    name: "Logo",
    description: null,
    category: "Design & Branding",
    bg: "#0a1933",
    badgeBg: "#3fb7f91f",
    badgeBorder: "#3fb7f940",
    badgeText: "#3fb7f9d9",
    gradientColor1: "rgba(64,184,250,0.22)",
    gradientColor2: "rgba(64,184,250,0)",
    gradientColor3: "rgba(64,184,250,0.12)",
    gradientColor4: "rgba(64,184,250,0)",
    nameSize: "text-[17px]",
    gridArea: "logo2",
  },
];

export const HeroBannerSection = () => {
  return (
    <section className="w-full bg-[#0a0a0f] py-12 px-12">
      {/* Top divider */}
      <div className="w-full h-px bg-[#ffffff14] mb-0" />

      {/* Section heading */}
      <h2 className="mt-[49px] font-['Inter',Helvetica] font-bold text-[#ffffffed] text-4xl tracking-[0] leading-[normal]">
        Brands We&#39;ve Built For
      </h2>

      {/* Section subtitle */}
      <p className="mt-[12px] font-['Inter',Helvetica] font-normal text-[#ffffff6b] text-[13px] tracking-[0] leading-[normal]">
        From startups to enterprises — here&#39;s who we&#39;ve built for.
      </p>

      {/* Cards grid using CSS grid with named areas to match the original layout */}
      <div
        className="mt-[46px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1300px]"
        style={{
          gridTemplateAreas: `
            "graphobot gcrown hotelshivganga logo1"
            "logo2     fruitbounty fruitbounty abcd"
          `,
        }}
      >
        {/* GraphoBot - large purple card, spans 2 rows */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "graphobot",
            background: "#0f0a2d",
          }}
        >
          {/* Top radial gradient */}
          <div
            className="absolute w-[374px] h-[290px] rounded-[187px/145px]"
            style={{
              top: "-87px",
              left: "68px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(140,97,242,0.22) 0%, rgba(140,97,242,0) 100%)",
            }}
          />
          {/* Bottom radial gradient */}
          <div
            className="absolute w-[204px] h-[145px] rounded-[102px/72.5px]"
            style={{
              top: "174px",
              left: "-34px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(140,97,242,0.12) 0%, rgba(140,97,242,0) 100%)",
            }}
          />
          {/* Description */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-normal text-[#ffffff73] text-xs tracking-[0] leading-[normal]"
            style={{ top: "178px" }}
          >
            AI-powered chatbot for business automation.
          </p>
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[22px] tracking-[0] leading-[normal]"
            style={{ top: "208px" }}
          >
            GraphoBot
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "236px",
              width: "110px",
              background: "#8c60f21f",
              borderColor: "#8c60f240",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#8c60f2d9" }}
            >
              AI & Web Dev
            </span>
          </div>
        </div>

        {/* G Crown Jewellery - blue card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "gcrown",
            background: "#0a1133",
          }}
        >
          <div
            className="absolute w-[312px] h-[214px] rounded-[156.2px/107px]"
            style={{
              top: "-64px",
              left: "57px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(51,153,250,0.22) 0%, rgba(51,153,250,0) 100%)",
            }}
          />
          <div
            className="absolute w-[170px] h-[107px] rounded-[85.2px/53.5px]"
            style={{
              top: "128px",
              left: "-28px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(51,153,250,0.12) 0%, rgba(51,153,250,0) 100%)",
            }}
          />
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[17px] tracking-[0] leading-[normal]"
            style={{ top: "132px" }}
          >
            G Crown Jewellery
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "160px",
              width: "110px",
              background: "#3399f91f",
              borderColor: "#3399f940",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#3399f9d9" }}
            >
              CRM Platform
            </span>
          </div>
        </div>

        {/* Hotel Shiv Ganga - green card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "hotelshivganga",
            background: "#0a2314",
          }}
        >
          <div
            className="absolute w-[312px] h-[214px] rounded-[156.2px/107px]"
            style={{
              top: "-64px",
              left: "57px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,217,115,0.22) 0%, rgba(56,217,115,0) 100%)",
            }}
          />
          <div
            className="absolute w-[170px] h-[107px] rounded-[85.2px/53.5px]"
            style={{
              top: "128px",
              left: "-28px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,217,115,0.12) 0%, rgba(56,217,115,0) 100%)",
            }}
          />
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[17px] tracking-[0] leading-[normal] w-[244px]"
            style={{ top: "132px" }}
          >
            Hotel Shiv Ganga
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "160px",
              width: "102px",
              background: "#38d8721f",
              borderColor: "#38d87240",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#38d872d9" }}
            >
              Hospitality
            </span>
          </div>
        </div>

        {/* Logo (Web Dev) - top right green card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "logo1",
            background: "#0a1e14",
          }}
        >
          <div
            className="absolute w-[374px] h-[210px] rounded-[187px/105px]"
            style={{
              top: "-63px",
              left: "68px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,224,140,0.22) 0%, rgba(56,224,140,0) 100%)",
            }}
          />
          <div
            className="absolute w-[204px] h-[105px] rounded-[102px/52.5px]"
            style={{
              top: "126px",
              left: "-34px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,224,140,0.12) 0%, rgba(56,224,140,0) 100%)",
            }}
          />
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[17px] tracking-[0] leading-[normal]"
            style={{ top: "128px" }}
          >
            Logo
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "156px",
              width: "72px",
              background: "#38e08c1f",
              borderColor: "#38e08c40",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#38e08cd9" }}
            >
              Web Dev
            </span>
          </div>
        </div>

        {/* Logo (Design & Branding) - bottom left blue card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "logo2",
            background: "#0a1933",
          }}
        >
          <div
            className="absolute w-[374px] h-[216px] rounded-[187px/108px]"
            style={{
              top: "-65px",
              left: "68px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(64,184,250,0.22) 0%, rgba(64,184,250,0) 100%)",
            }}
          />
          <div
            className="absolute w-[204px] h-[108px] rounded-[102px/54px]"
            style={{
              top: "130px",
              left: "-34px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(64,184,250,0.12) 0%, rgba(64,184,250,0) 100%)",
            }}
          />
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[17px] tracking-[0] leading-[normal]"
            style={{ top: "134px" }}
          >
            Logo
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "162px",
              width: "148px",
              background: "#3fb7f91f",
              borderColor: "#3fb7f940",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#3fb7f9d9" }}
            >
              Design & Branding
            </span>
          </div>
        </div>

        {/* Fruit Bounty - wide orange card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "fruitbounty",
            background: "#281107",
          }}
        >
          <div
            className="absolute w-[640px] h-[292px] rounded-[320.1px/146px]"
            style={{
              top: "-88px",
              left: "116px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(250,148,38,0.22) 0%, rgba(250,148,38,0) 100%)",
            }}
          />
          <div
            className="absolute w-[349px] h-[146px] rounded-[174.6px/73px]"
            style={{
              top: "175px",
              left: "-58px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(250,148,38,0.12) 0%, rgba(250,148,38,0) 100%)",
            }}
          />
          {/* Description */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-normal text-[#ffffff73] text-xs tracking-[0] leading-[normal] w-[542px]"
            style={{ top: "180px" }}
          >
            Complete brand identity for a bold market entry.
          </p>
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[22px] tracking-[0] leading-[normal]"
            style={{ top: "210px" }}
          >
            Fruit Bounty
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "238px",
              width: "148px",
              background: "#f993261f",
              borderColor: "#f9932640",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#f99326d9" }}
            >
              Branding & Design
            </span>
          </div>
        </div>

        {/* Abcd - pink/purple card */}
        <div
          className="rounded-2xl overflow-hidden border border-solid border-[#ffffff14] relative"
          style={{
            gridArea: "abcd",
            background: "#1e0a33",
          }}
        >
          <div
            className="absolute w-[374px] h-[296px] rounded-[187px/148px]"
            style={{
              top: "-89px",
              left: "68px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(224,71,173,0.22) 0%, rgba(224,71,173,0) 100%)",
            }}
          />
          <div
            className="absolute w-[204px] h-[148px] rounded-[102px/74px]"
            style={{
              top: "178px",
              left: "-34px",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(224,71,173,0.12) 0%, rgba(224,71,173,0) 100%)",
            }}
          />
          {/* Description */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-normal text-[#ffffff73] text-xs tracking-[0] leading-[normal] w-[300px]"
            style={{ top: "184px" }}
          >
            Data-driven campaigns that convert.
          </p>
          {/* Name */}
          <p
            className="absolute left-5 font-['Inter',Helvetica] font-bold text-[#ffffffed] text-[22px] tracking-[0] leading-[normal]"
            style={{ top: "214px" }}
          >
            Abcd
          </p>
          {/* Badge */}
          <div
            className="absolute left-5 flex items-center h-[22px] rounded-[11px] overflow-hidden border border-solid px-2.5"
            style={{
              top: "242px",
              width: "148px",
              background: "#e047ad1f",
              borderColor: "#e047ad40",
            }}
          >
            <span
              className="font-['Inter',Helvetica] font-medium text-[10px] tracking-[0] leading-[normal]"
              style={{ color: "#e047add9" }}
            >
              Digital Marketing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};