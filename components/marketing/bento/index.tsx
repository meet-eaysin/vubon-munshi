
import type { ReactNode } from 'react'
import { useId } from 'react'
import { Section } from '@/components/section'
import { Tile, TileContent, TileDescription, TileLink, TileTitle, TileVisual } from '@/components/ui/tile'
import AiGenerate from '@/components/marketing/bento/ai-generate'
import ChatIllustration from '@/components/marketing/bento/chat'
import PipelineIllustration from '@/components/marketing/bento/pipeline'
import TilesIllustration from '@/components/marketing/bento/tiles'

interface TileProps {
  title: string
  description: ReactNode
  visual: ReactNode
  size?: string
  icon?: ReactNode
}

interface BentoGridProps {
  title?: string
  description?: string
  tiles?: TileProps[] | false
  className?: string
}

export default function BentoGrid({
  title = 'bento.title',
  description = 'bento.description',
  tiles = [
    {
      title: 'bento.ai_coding.title',
      description: <p>{'bento.ai_coding.description'}</p>,
      visual: (
        <div className='min-h-[300px] w-full py-12'>
          <AiGenerate />
        </div>
      ),
      size: 'col-span-12 sm:col-span-6 lg:col-span-5',
    },
    {
      title: 'bento.lightning_fast.title',
      description: <p className='max-w-[520px]'>{'bento.lightning_fast.description'}</p>,
      visual: (
        <div className='min-h-[160px] w-full grow items-center self-center'>
          <PipelineIllustration />
        </div>
      ),
      size: 'col-span-12 sm:col-span-6 lg:col-span-7',
    },
    {
      title: 'bento.tech_stack_freedom.title',
      description: (
        <>
          <p>{'bento.tech_stack_freedom.description_1'}</p>
          <p>{'bento.tech_stack_freedom.description_2'}</p>
        </>
      ),
      visual: (
        <div className='w-full sm:p-4 md:p-8'>
          <ChatIllustration />
        </div>
      ),
      size: 'col-span-12 sm:col-span-6 lg:col-span-5',
    },
    {
      title: 'bento.community_driven.title',
      description: (
        <>
          <p className='max-w-[460px]'>{'bento.community_driven.description_1'}</p>
          <p>{'bento.community_driven.description_2'}</p>
        </>
      ),
      visual: <TilesIllustration />,
      size: 'col-span-12 sm:col-span-6 lg:col-span-7',
    },
  ],
  className,
}: BentoGridProps) {
  const sectionId = useId()

  return (
    <div id={sectionId} className={className}  >
      <div className='max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8' id="features">
        <h2 className='text-center text-2xl font-semibold text-balance sm:text-3xl md:text-4xl lg:text-5xl'>{title}</h2>
        <p className='text-base text-muted-foreground max-w-full sm:max-w-[680px] md:max-w-[840px] text-center font-medium text-balance sm:text-lg md:text-xl'>
          {description}
        </p>
        {tiles !== false && tiles.length > 0 && (
          <div className='grid grid-cols-12 gap-3 sm:gap-4 w-full'>
            {tiles.map((tile) => (
              <Tile key={tile.title} className={tile.size}>
                <TileLink />
                <TileContent>
                  {tile.icon && tile.icon}
                  <TileTitle>{tile.title}</TileTitle>
                  <TileDescription>{tile.description}</TileDescription>
                </TileContent>
                <TileVisual>{tile.visual}</TileVisual>
              </Tile>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}