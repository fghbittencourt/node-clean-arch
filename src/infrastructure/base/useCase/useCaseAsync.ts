import UseCaseInput from './useCaseInput'

export default interface UseCaseAsync {
  execute(input: UseCaseInput): Promise<void>;
}
