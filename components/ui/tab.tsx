'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const tabVariants = cva(
  'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      state: {
        default:
          "relative text-primary-foreground hover:opacity-80 after:content-[''] after:w-full after:absolute after:bg-primary-foreground after:h-1 after:inset-x-0 after:-bottom-1 after:opacity-0 after:transition-opacity peer-checked:after:opacity-100",
      },
      size: {
        default: 'h-9 px-4 py-2',
      }
    },
    defaultVariants: {
      state: 'default',
      size: 'default'
    }
  }
)

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  name: string;
  defaultSelected: string;
}
export interface TabProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  value: string;
}

const TabsContext = React.createContext({ name: '', defaultSelected: '' });
// TODO: onchange 이벤트 추가 필요
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, name, defaultSelected, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <TabsContext.Provider value={{ name, defaultSelected }}>
        <Comp
          className={cn(className = "flex gap-2 px-2 py-2 pb-3 w-full overflow-x-auto bg-primary", className)}
          ref={ref}
          {...props}
        />
      </TabsContext.Provider>

    )
  }
)
const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ className, value, asChild = false, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const context = React.useContext(TabsContext)
    const Comp = asChild ? Slot : 'div'
    return (
      <label>
        <input ref={inputRef} type='radio' name={context.name} value={value} className='peer sr-only' defaultChecked={context.defaultSelected === value} />
        <Comp
          className={cn(tabVariants({ state: 'default', size: 'default', className }))}
          ref={ref}
          {...props}
        />
      </label>

    )
  }
)
Tabs.displayName = 'Tabs'
Tab.displayName = 'Tab'


export { Tabs, Tab, tabVariants }
