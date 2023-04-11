import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-erros'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase // System Under Tester

describe('Check-in Use Case', async () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository) // System Under Tester

    await gymsRepository.create({
      gym_id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      latitude: new Decimal(-2.4117248),
      longitude: new Decimal(-48.2500316),
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.4117248,
      userLongitude: -48.2500316,
    })

    await expect(checkIn.checkIn_id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0)) // 0 represa o indice do mês

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.4117248,
      userLongitude: -48.2500316,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -2.4117248,
        userLongitude: -48.2500316,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0)) // 0 represa o indice do mês

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.4117248,
      userLongitude: -48.2500316,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.4117248,
      userLongitude: -48.2500316,
    })

    expect(checkIn.checkIn_id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      gym_id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      latitude: new Decimal(-2.2769401),
      longitude: new Decimal(-48.2251648),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -2.4117248,
        userLongitude: -48.2500316,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
