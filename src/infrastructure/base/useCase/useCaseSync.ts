import UseCaseInput from './useCaseInput'
import UseCaseOutput from './useCaseOutput'

export default interface UseCaseSync {
  execute(input?: UseCaseInput): Promise<UseCaseOutput>;
}
