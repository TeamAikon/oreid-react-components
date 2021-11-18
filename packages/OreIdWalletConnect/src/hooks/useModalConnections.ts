import { useState } from 'react'
import { ModalConnections } from '../types'

export const useModalConnections = () => useState<ModalConnections>(ModalConnections.Closed)
