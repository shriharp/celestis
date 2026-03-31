import { useState, useEffect } from "react";
import { Book, GitCommit, GitBranch, Terminal } from "lucide-react";
import { getDomainsWithWorkshops } from "../services/eventsService";

export default function DomainsList() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getDomainsWithWorkshops();
      setDomains(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div
        id="domains"
        className="w-full py-20 flex justify-center items-center min-h-[400px]"
      >
        <div className="text-github-textMuted animate-pulse">
          Fetching repositories...
        </div>
      </div>
    );
  }

  return (
    <div
      id="domains"
      className="w-full bg-github-bg py-12 border-b border-github-border"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 border-b border-github-border pb-4">
          <h2 className="text-2xl font-semibold text-github-textPrimary flex items-center">
            <Book className="mr-2 w-6 h-6 text-github-textMuted" />
            Core Domains
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="repo-card flex flex-col group hover:border-github-borderHover transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="p-6 border-b border-github-border flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-github-blue text-lg font-bold flex items-center hover:underline cursor-pointer transition-colors group-hover:text-github-blue">
                    <span className="group-hover:text-github-blue transition-colors">
                      {domain.name}
                    </span>
                  </h3>
                  <p
                    className="text-sm mt-3 flex items-center gap-2 font-semibold"
                    style={{ color: "var(--color-blue)" }}
                  >
                    <span
                      className={`w-3 h-3 rounded-full bg-${domain.color}`}
                    />
                    {domain.symbol}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--color-canvas)",
                    color: "var(--color-textMuted)",
                  }}
                >
                  Public
                </div>
              </div>

              {domain.image && (
                <div className="w-full h-40 overflow-hidden border-b border-github-border relative bg-github-canvas group-hover:opacity-90 transition-opacity duration-300">
                  <img
                    src={domain.image}
                    alt={domain.symbol}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-300"
                    style={{ objectPosition: domain.imagePosition || "center" }}
                  />
                </div>
              )}

              <div className="p-6 bg-github-bg flex-grow">
                <div className="space-y-4">
                  {domain.workshops.map((workshop) => (
                    <div
                      key={workshop.id}
                      className="flex flex-col hover:opacity-90 transition-opacity"
                    >
                      <h5 className="font-semibold text-github-textPrimary text-sm flex items-center mb-2">
                        <div className="w-2 h-2 rounded-full bg-github-green mr-3" />
                        {workshop.title}
                      </h5>
                      <p className="text-xs text-github-textMuted pl-5 leading-relaxed">
                        {workshop.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-3 bg-github-canvas border-t border-github-border text-xs text-github-textMuted flex items-center justify-between rounded-b-md transition-all duration-200 group-hover:text-github-blue">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full bg-${domain.color} mr-2`}
                    />{" "}
                    Markdown
                  </div>
                  <div className="flex items-center cursor-pointer transition-colors">
                    <GitBranch className="w-3.5 h-3.5 mr-1" /> 1 branch
                  </div>
                </div>
                <div>Updated 2 hours ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
