# Supabase Sales Dashboard 📊

A real-time sales tracking dashboard built with React and Supabase to learn modern web development practices including authentication, real-time data synchronization, and state management.

## 🎯 Project Purpose

This project started as a learning journey to understand **Supabase** fundamentals, but evolved into a comprehensive exploration of:

- **Supabase Integration**: Database queries, real-time subscriptions, and authentication
- **React Authentication**: Implementing secure user sign-up/sign-in flows
- **Context API**: Managing global authentication state
- **React Router**: Client-side routing and protected routes
- **Form Handling**: Using React's `useActionState` hook for form submissions
- **Real-time Updates**: Live data synchronization across users

## ✨ Features

- 🔐 **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- 📈 **Sales Metrics Dashboard**: View aggregated sales data by employee
- ➕ **Add New Deals**: Submit new sales deals through an interactive form
- 🔄 **Real-time Updates**: Automatically sync data changes across all connected clients
- 📊 **Data Visualization**: Display sales metrics with charts (powered by Recharts)
- 🎨 **Responsive UI**: Clean, accessible interface built with React

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Database & Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router v6
- **State Management**: Context API + React Hooks
- **Charts**: Recharts
- **Styling**: CSS3

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/supabase-sales-dashboard.git
   cd supabase-sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   Run these SQL commands in your Supabase SQL Editor:
   
   ```sql
   -- Create sales_deals table
   CREATE TABLE sales_deals (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     value NUMERIC NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable aggregates
   ALTER ROLE authenticator SET pgrst.db_aggregates_enabled = 'true';
   NOTIFY pgrst, 'reload config';

   -- Enable Row Level Security
   ALTER TABLE sales_deals ENABLE ROW LEVEL SECURITY;

   -- Create policy for authenticated users
   CREATE POLICY "Allow authenticated users to read sales_deals"
   ON sales_deals FOR SELECT
   TO authenticated
   USING (true);

   CREATE POLICY "Allow authenticated users to insert sales_deals"
   ON sales_deals FOR INSERT
   TO authenticated
   WITH CHECK (true);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
supabase-sales-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── SignIn.jsx          # Sign in form
│   │   ├── SignUp.jsx          # Sign up form
│   │   └── Form.jsx            # Add deal form
│   ├── routes/
│   │   └── Dashboard.jsx       # Main dashboard view
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── supabase-client.js      # Supabase client configuration
│   ├── router.jsx              # React Router configuration
│   ├── main.jsx                # Application entry point
│   └── App.jsx                 # Root component
├── .env                        # Environment variables
├── package.json
└── README.md
```

## 🔑 Key Concepts Learned

### 1. **Supabase Client Setup**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```

### 2. **Authentication with Context API**
```javascript
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. **Real-time Subscriptions**
```javascript
const channel = supabase
  .channel('deal-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'sales_deals' },
    (payload) => console.log('New change:', payload.new)
  )
  .subscribe();
```

### 4. **Data Aggregation**
```javascript
const { data, error } = await supabase
  .from('sales_deals')
  .select('name, value.sum()')
  .order('value', { ascending: false });
```

### 5. **Form Handling with useActionState**
```javascript
const [error, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    return error ? new Error(error.message) : null;
  },
  null
);
```

## 🚀 Features Breakdown

### Authentication System
- User registration with email/password
- Secure login with session management
- Persistent sessions across page refreshes
- Protected routes requiring authentication

### Dashboard
- Display total sales per employee
- Real-time updates when new deals are added
- Aggregated data visualization
- Responsive chart interface

### Add Deal Form
- Submit new sales deals
- Real-time validation
- Loading states during submission
- Error handling and user feedback

## 🎓 Learning Outcomes

Through building this project, I gained hands-on experience with:

✅ Setting up and configuring Supabase projects  
✅ Implementing authentication flows in React  
✅ Managing global state with Context API  
✅ Creating real-time subscriptions  
✅ Handling asynchronous operations with async/await  
✅ Building accessible forms with proper ARIA attributes  
✅ Implementing client-side routing with React Router  
✅ Using PostgreSQL aggregate functions  
✅ Structuring a scalable React application  
✅ Environment variable management  

## 🐛 Troubleshooting

### Issue: "No API key found in request"
**Solution**: Ensure your `.env` file is in the root directory and restart the dev server.

### Issue: "PGRST123: Use of aggregate functions is not allowed"
**Solution**: Run the following SQL commands in Supabase:
```sql
ALTER ROLE authenticator SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst, 'reload config';
```

### Issue: Changes not reflecting in real-time
**Solution**: Check that you've properly set up the real-time subscription and that your Supabase project has real-time enabled.

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built while following Supabase tutorials and documentation
- Inspired by modern SaaS dashboard designs
- Thanks to the React and Supabase communities for excellent documentation

## 📧 Contact

**Your Name** - [@rachiitfr](https://x.com/rachiitfr)

Project Link: [https://github.com/yourusername/supabase-sales-dashboard](https://github.com/yourusername/supabase-sales-dashboard)

---

⭐ If you found this project helpful for learning, please consider giving it a star!