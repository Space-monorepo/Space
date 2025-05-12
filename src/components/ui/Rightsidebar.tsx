import React from 'react';
import { Campaign } from '@/app/api/src/types/posts/Campaign';
import { Discussion } from '@/app/api/src/types/posts/Discussion';
import { AgendaItem } from '@/app/api/src/types/posts/AgendaItem';

interface RightSidebarProps {
  campaigns: Campaign[];
  discussions: Discussion[];
  agendaItems: AgendaItem[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  campaigns,
  discussions,
  agendaItems
}) => {
  return (
    <aside className="flex grow gap-5 text-neutral-800 max-md:mt-10">
      <div className="flex shrink-0 w-px bg-stone-300 h-[928px]" />
      <div className="self-start mt-10 max-md:mt-10">
        <section className="w-full">
          <h2 className="gap-2 self-stretch py-3 w-full text-sm font-semibold text-neutral-800">
            Minhas Campanhas
          </h2>
          <div className="w-full text-xs">
            {campaigns.map((campaign, index) => (
              <div key={index} className="flex gap-2 items-center py-3 pr-1.5 pl-3 w-full rounded-sm bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={campaign.icon}
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt=""
                />
                <span className="self-stretch my-auto text-neutral-800 w-[139px]">
                  {campaign.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 w-full text-xs">
          <h2 className="gap-2 self-stretch py-3 w-full text-sm font-semibold text-neutral-800">
            Em discussão agora
          </h2>
          {discussions.map((discussion, index) => (
            <div key={index} className="flex gap-2 items-center py-2 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={discussion.icon}
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt=""
              />
              <span className="self-stretch my-auto text-neutral-800">
                {discussion.title}
              </span>
            </div>
          ))}
        </section>

        <section className="mt-10 w-full text-xs">
          <h2 className="gap-2 self-stretch py-3 w-full text-sm font-semibold text-neutral-800">
            Agenda Comunitária
          </h2>
          {agendaItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-center py-2 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt=""
              />
              <span className="self-stretch my-auto text-neutral-800 w-[139px]">
                {item.title}
              </span>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};