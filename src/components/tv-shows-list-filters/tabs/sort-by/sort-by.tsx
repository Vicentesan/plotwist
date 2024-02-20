import { useFormContext } from 'react-hook-form'
import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLanguage } from '@/context/language'
import { TvShowsListFiltersFormValues } from '../..'

const options = [
  'popularity.desc',
  'popularity.asc',
  'revenue.desc',
  'revenue.asc',
  'air_date.desc',
  'air_date.asc',
  'vote_average.desc',
  'vote_average.asc',
  'vote_count.desc',
  'vote_count.asc',
] as const

export const SortBy = () => {
  const { control } = useFormContext<TvShowsListFiltersFormValues>()
  const { dictionary } = useLanguage()

  return (
    <FormField
      control={control}
      name="sort_by"
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem>
            <FormLabel>
              {dictionary.movies_list_filters.sort_by.label}
            </FormLabel>

            <FormControl>
              <Select
                onValueChange={onChange}
                value={value}
                defaultValue={options[0]}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      dictionary.movies_list_filters.sort_by.placeholder
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {options.map((option) => {
                    return (
                      <SelectItem value={option} key={option}>
                        <div className="flex items-center gap-1">
                          {option.endsWith('asc') ? (
                            <ChevronDown width={16} height={16} />
                          ) : (
                            <ChevronUp width={16} height={16} />
                          )}
                          a
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
