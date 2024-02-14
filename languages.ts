import { Language } from '@/types/languages'

export type SupportedLanguages = {
  label: string
  value: Language
  country: string
  enabled: boolean
}

export const SUPPORTED_LANGUAGES: Array<SupportedLanguages> = [
  { label: 'English', value: 'en-US', country: 'US', enabled: true },
  { label: 'Español', value: 'es-ES', country: 'ES', enabled: true },
  { label: 'Français', value: 'fr-FR', country: 'FR', enabled: true },
  { label: 'Deutsch', value: 'de-DE', country: 'DE', enabled: true },
  { label: 'Italiano', value: 'it-IT', country: 'IT', enabled: true },
  { label: 'Português', value: 'pt-BR', country: 'BR', enabled: true },
  { label: '日本語', value: 'ja-JP', country: 'JP', enabled: true },
]

export const languages: Language[] = [
  'en-US',
  'es-ES',
  'fr-FR',
  'de-DE',
  'it-IT',
  'pt-BR',
  'ja-JP',
]