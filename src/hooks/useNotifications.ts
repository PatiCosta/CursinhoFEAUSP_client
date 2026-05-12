import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'
import { Student } from '../interfaces/Student.interface'

const LAST_SEEN_KEY = 'cursinho_notif_last_seen'
const POLL_MS = 60_000

export interface StudentNotification {
  student: Student
  subscription: {
    schoolClassID: string
    productName: string
    paymentStatus: string
    paymentDate: Date | null
    valuePaid: number
    matriculaID: string | null
    txid: string
    paymentMethod: string
  }
}

function getLastSeenAt(): string {
  return (
    localStorage.getItem(LAST_SEEN_KEY) ??
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  )
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<StudentNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = useCallback(async () => {
    try {
      const lastSeenAt = getLastSeenAt()

      const response = await api.get('/students', {
        params: { page: 1, pageRange: 30, paymentStatus: 'CONCLUIDA', initDate: lastSeenAt },
      })

      const students: Student[] = response.data.studentsList ?? []
      const cutoff = new Date(lastSeenAt)
      const notifs: StudentNotification[] = []

      students.forEach((student) => {
        ;(student.purcharsedSubscriptions ?? []).forEach((sub: any) => {
          const isConcluida =
            sub.paymentStatus === 'CONCLUIDA' || sub.paymentStatus === 'CONCLUÍDA'
          const isRecent = sub.paymentDate && new Date(sub.paymentDate) >= cutoff
          if (isConcluida && isRecent) {
            notifs.push({ student, subscription: sub })
          }
        })
      })

      setNotifications(notifs)
      setUnreadCount(notifs.length)
    } catch {
      // silently ignore — notification failure shouldn't break the app
    }
  }, [])

  const markAllRead = useCallback(() => {
    localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString())
    setUnreadCount(0)
  }, [])

  useEffect(() => {
    fetchNotifications()
    const id = setInterval(fetchNotifications, POLL_MS)
    return () => clearInterval(id)
  }, [fetchNotifications])

  return { notifications, unreadCount, markAllRead }
}
