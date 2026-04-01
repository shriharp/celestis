import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, GitCommit, GitBranch, Terminal } from "lucide-react";
import { getDomainsWithWorkshops } from "../services/eventsService";

export default function DomainsList() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      className="w-full bg-github-bg py-12 pt-4 border-b border-github-border"
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
              className="repo-card flex flex-col group hover:border-github-borderHover transition-all duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden"
              onClick={() => navigate(`/domains/${domain.id}`)}
            >
              {/* Header */}
              <div className="p-6 border-b border-github-border flex justify-between items-start bg-github-canvas">
                <div className="flex-1">
                  <h3 className="text-github-blue text-lg font-bold hover:underline">
                    {domain.name}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-github-canvas text-github-textMuted">
                  Public
                </div>
              </div>

              {/* 🔥 Image (FULLY VISIBLE) */}
              {domain.image && (
                <div className="w-full h-[375px] overflow-hidden relative">
                  <img
                    src={domain.image}
                    alt={domain.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: domain.imagePosition || "center" }}
                  />
                  <div className="px-0 pb-1 bottom-[-5px] left-0 right-0 z-10 absolute">
                    <div
                      className="backdrop-blur-md p-4 shadow-lg"
                      style={{ backgroundColor: "#0d1117cc" }} // GitHub dark + transparency
                    >
                      <div className="space-y-4">
                        {domain.workshops.map((workshop) => (
                          <div key={workshop.id}>
                            <h5 className="font-semibold text-gray-200 text-sm flex items-center mb-2">
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
                  </div>
                </div>
              )}

              {/* 🔥 Content overlapping image */}

              {/* Footer */}
              <div className="px-6 py-3 border-t border-github-border text-xs text-github-textMuted flex items-center justify-between bg-github-canvas">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full bg-${domain.color} mr-2`}
                    />
                    Markdown
                  </div>
                  <div className="flex items-center">
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
