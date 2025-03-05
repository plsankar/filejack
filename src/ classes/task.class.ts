export abstract class Task {
    public abstract run(): Promise<void>;
    public abstract menu(): { name: string; value: string };
}
