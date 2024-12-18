'use client'

import { createContext, useContext, useState } from 'react'
import {
  AuthContext,
  AuthContextProviderProps,
  Credentials,
  type ResetPasswordProps,
} from './auth.types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { useLanguage } from '../language'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Profile } from '@/types/supabase'
import { getProfileById } from '@/services/api/profiles'
import { APP_URL } from '../../../constants'

export const authContext = createContext({} as AuthContext)

export const AuthContextProvider = ({
  children,
  initialUser,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<Profile | null>(initialUser)
  const { dictionary, language } = useLanguage()
  const supabase = createClientComponentClient()
  const { push } = useRouter()

  const signInWithCredentials = async (
    credentials: Omit<Credentials, 'username'>,
  ) => {
    const { error, data } = await supabase.auth.signInWithPassword(credentials)

    if (error) {
      toast.error(dictionary.login_form.invalid_login_credentials, {
        action: {
          label: dictionary.login_form.try_again,
          onClick: () => signInWithCredentials(credentials),
        },
      })

      return
    }

    if (data) {
      push(`/${language}/home`)

      const profile = await getProfileById(data.user.id)
      setUser(profile)

      toast.success(dictionary.login_form.login_success)
    }
  }

  const signUpWithCredentials = async (credentials: Credentials) => {
    const { error } = await supabase.auth.signUp({
      ...credentials,
      options: {
        data: {
          username: credentials.username,
        },
      },
    })

    if (error) {
      toast.error(dictionary.email_already_taken)
      return
    }

    toast.success(dictionary.sign_up_form.sign_up_success)
    await signInWithCredentials(credentials)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error(error.message, {
        action: {
          label: dictionary.sign_up_form.try_again,
          onClick: () => logout(),
        },
      })

      return
    }

    toast.success(dictionary.auth.logout_success)
    setUser(null)
  }

  const requestPasswordReset = async ({
    email,
  }: Omit<Credentials, 'username' | 'password'>) => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_URL}/${language}/reset-password`,
    })

    toast.success(dictionary.request_password_reset_form_response) // we have only one response, because we don't want to expose the email existence for a potencial BruteForce attack
  }

  const resetPassword = async ({ code, password }: ResetPasswordProps) => {
    const { error: verifyOtpError } = await supabase.auth.verifyOtp({
      type: 'recovery',
      token_hash: code,
    })

    if (verifyOtpError) {
      toast.error(dictionary.invalid_reset_password_code)

      return
    }

    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password,
    })

    if (updatePasswordError) {
      toast.error(dictionary.unexpected_error)

      return
    }

    toast.success(dictionary.reset_password_success)

    push(`/${language}/login`)
  }

  return (
    <authContext.Provider
      value={{
        user,
        signInWithCredentials,
        signUpWithCredentials,
        logout,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error('ListsContext must be used within ListsContextProvider')
  }

  return context
}
