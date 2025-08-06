
const PRIMARY = "#02AAA0";


export default function SideBar({ items = data, activeRoute = "/profile-settings", onNavigate }) {
  return (
    <aside className="min-h-screen  w-full">
      <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 !min-h-screen rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
        {/* Menu list */}
        <ul className="overflow-y-auto divide-y divide-gray-100">
          {items.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <li key={item.id}>
                <p
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(item.route);
                    }
                  }}
                  className={[
                    "group cursor-pointer flex items-center gap-3 px-5 py-3.5 transition",
                    "hover:bg-[rgba(2,170,160,0.08)]",
                    isActive ? "bg-[rgba(2,170,160,0.10)]" : "",
                  ].join(" ")}
                >
                  {/* Left active rail */}
                  <span
                    className={[
                      "absolute ml-[-20px] h-6 w-1 rounded-full",
                      isActive ? "bg-[" + PRIMARY + "]" : "bg-transparent",
                    ].join(" ")}
                    aria-hidden
                  />

                  {/* Icon */}
                  <span
                    className={[
                      "grid place-items-center h-9 w-9 rounded-xl ring-1 ring-black/5",
                      "bg-white shadow",
                      "group-hover:scale-105",
                    ].join(" ")}
                    style={{ color: PRIMARY }}
                  >

                    <span className="[&>*]:h-5 [&>*]:w-5" style={{ color: PRIMARY }}>
                      {item.icon}
                    </span>
                  </span>

                  {/* Label */}
                  <span
                    className={[
                      "text-sm font-medium",
                      isActive ? "text-[#111827]" : "text-[#111827]",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>

                  {/* Chevron */}
                  <span className="ml-auto h-2 w-2 rounded-full opacity-0 group-hover:opacity-100" style={{ backgroundColor: PRIMARY }} />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
