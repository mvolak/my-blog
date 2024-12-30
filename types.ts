// export type Post = {
//     id: number;
//     title: string;
//     content: string;
//   };

// types/index.ts
export type Post = {
    id: number
    title: string
    content: string
    description: string
    slug: string
    created_at: string
    user_id: string
    category_id: number
    profiles?: {
      username: string
    }
    categories?: {
      name: string
      slug: string
    }
  }
  
  export type Category = {
    id: number
    name: string
    slug: string
    created_at?: string
  }
  
  export type Profile = {
    id: string
    username: string
    avatar_url?: string
    bio?: string
  }