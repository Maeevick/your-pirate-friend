export type Project = {
  id: string;
  name: string;
  ownerId: string;
  apiPublicKey: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IProjectRepository {
  findByDomain(domain: string): Promise<Project | null>;
  findByPublicKey(key: string): Promise<Project | null>;
}
