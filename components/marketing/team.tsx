import Image from "next/image";
import { TEAM } from "@/config/team";
import Container from "@/components/marketing/container";
import { Github, Twitter, Linkedin, Facebook, Users } from "lucide-react";

const Team = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full">
      <div>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            The people behind the innovation
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Meet the passionate team of educators, content creators, and technology experts making mathematics accessible to students across Bangladesh
          </p>
        </div>
      </div>
      <div>
        <div className="mt-16 w-full">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TEAM.slice(0, 2).map((member) => (
                <FounderCard key={member.name} member={member} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEAM.slice(2, 5).map((member) => (
                <ExecutiveCard key={member.name} member={member} />
              ))}
            </div>

            <div className="flex justify-center">
              {TEAM.slice(5).map((member) => (
                <SpecialistCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FounderCard = ({ member }: { member: typeof TEAM[0] }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      case 'facebook': return Facebook;
      default: return null;
    }
  };

  return (
    <div className="group">
      <div className="bg-card border border-border rounded-2xl p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image and basic info */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
              <Image
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                {Object.entries(member.social).map(([platform, url]) => {
                  const Icon = getSocialIcon(platform);
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s ${platform}`}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExecutiveCard = ({ member }: { member: typeof TEAM[0] }) => {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 h-full hover:border-primary/20 transition-colors duration-300">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
          <Image
            src={member.image}
            alt={member.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-semibold font-heading text-foreground group-hover:text-primary transition-colors mb-1">
          {member.name}
        </h4>
        <p className="text-xs font-medium text-primary mb-2">{member.role}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
};

const SpecialistCard = ({ member }: { member: typeof TEAM[0] }) => {
  return (
    <div className="group max-w-md">
      <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-md hover:border-primary/20">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-sm">
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm font-medium text-primary">{member.role}</span>
          </div>
          <h4 className="text-lg font-semibold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
            {member.name}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
