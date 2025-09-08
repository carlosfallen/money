
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Calculator, Shield, TrendingUp, Target, Lightbulb, CreditCard, ArrowRight, Users, Lock, BarChart3, Star, Zap, Award, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { AuthService } from '../../services/authService';

interface LoginScreenProps {
  onAuthSuccess?: (user: User) => void;
}

interface FormData {
  email: string;
  phone: string;
  password: string;
}

interface Feature {
  icon: any;
  title: string;
  description: string;
  highlight: string;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: any;
}

interface Testimonial {
  text: string;
  author: string;
}

export default function LoginScreen({ onAuthSuccess }: LoginScreenProps) {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginMethod, setLoginMethod] = useState<'options' | 'email'>('options');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    password: ''
  });

  const features: Feature[] = [
    {
      icon: BarChart3,
      title: "Dashboard Inteligente",
      description: "Visão 360º do seu financeiro num único ecrã. Acompanhe saldo, score e vencimentos.",
      highlight: "Visão Completa",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Projeções de Futuro",
      description: "Veja o seu património crescer ano após ano. Calcule poupança futura baseada no salário.",
      highlight: "Planeamento",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Controle de Orçamentos",
      description: "Crie orçamentos por categoria e acompanhe gastos em tempo real. Sem surpresas.",
      highlight: "Sem Surpresas",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Lightbulb,
      title: "Assistente IA",
      description: "Insights inteligentes para otimizar gastos e identificar oportunidades de poupança.",
      highlight: "IA Integrada",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: CreditCard,
      title: "Gestão de Dívidas",
      description: "Organize despesas recorrentes e parceladas. Nunca mais esqueça um pagamento.",
      highlight: "Organizado",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Lock,
      title: "Privacidade Total",
      description: "Dados criptografados localmente, sincronização segura, controle total sobre acesso.",
      highlight: "Seguro",
      color: "from-slate-500 to-gray-500"
    }
  ];

  const stats: Stat[] = [
    { number: "Beta", label: "Fase atual", icon: Zap },
    { number: "2.1k+", label: "Beta testers", icon: Users },
    { number: "100%", label: "Privado", icon: Shield }
  ];

  const testimonials: Testimonial[] = [
    { text: "Finalmente consegui organizar minhas finanças de forma simples", author: "Maria S." },
    { text: "A melhor ferramenta para quem trabalha de carteira assinada", author: "João P." },
    { text: "Interface limpa e funcionalidades que realmente fazem diferença", author: "Ana L." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    setError('');
    try {
      console.log('Iniciando login com Google...');
      await AuthService.signInWithGoogle();
      // O redirect vai acontecer automaticamente
      // Não precisamos fazer mais nada aqui
    } catch (error) {
      console.error('Erro ao iniciar login com Google:', error);
      setError('Erro ao iniciar login com Google. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await AuthService.signInWithEmail(formData.email, formData.password);
      console.log('Login realizado com sucesso:', user);
      // O onAuthStateChanged do App vai capturar automaticamente
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Credenciais inválidas. Verifique email e senha.');
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await AuthService.signUpWithEmail(formData.email, formData.password);
      console.log('Cadastro realizado com sucesso:', user);
      // O onAuthStateChanged do App vai capturar automaticamente
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const renderLoginContent = (): JSX.Element => {
    if (loginMethod === 'options') {
      return (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="relative mx-auto mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl border border-slate-700">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Bem-vindo de volta!
            </h3>
            <p className="text-slate-600">
              Como você gostaria de acessar?
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full group relative overflow-hidden bg-white hover:bg-gray-50 border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
            >
              <div className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
                    <span>Redirecionando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continuar com Google</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">ou</span>
              </div>
            </div>

            <button
              onClick={() => setLoginMethod('email')}
              className="w-full group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                <span>Entrar com Email</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (loginMethod === 'email') {
      return (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="relative mx-auto mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Entrar com Email
            </h3>
            <p className="text-slate-600">
              Digite suas credenciais para acessar
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-70"
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Entrar</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={handleEmailSignUp}
                disabled={isLoading}
                className="flex-1 group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25 active:scale-[0.98] disabled:opacity-70"
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Cadastrar</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>

          <button
            onClick={() => setLoginMethod('options')}
            className="w-full text-slate-500 hover:text-slate-700 py-2 text-sm transition-colors"
          >
            ← Voltar às opções de login
          </button>
        </div>
      );
    }

    return <></>;
  };
return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
        style={{ animationDelay: "4s" }}
      />
    </div>

    <div className="relative z-10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-12">
        {/* TOPO: grid 2 colunas */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coluna Esquerda: título, subtítulo, stats */}
          <div className="space-y-6 lg:space-y-8">
            <div className="text-center lg:text-left space-y-4 lg:space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="relative">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-xl border border-slate-600">
                    <Calculator className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">CLT Finance</h1>
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full border border-amber-500/30 backdrop-blur-sm">
                      <span className="text-amber-300 text-xs lg:text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Beta
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs lg:text-sm mt-1">Versão Beta • Acesso Gratuito</p>
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  O Assistente Financeiro
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-2xl lg:text-4xl font-bold mt-1 lg:mt-2">
                    Definitivo para CLT
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Controle total do seu salário, 13º, benefícios e despesas. Planeje seu futuro financeiro com inteligência.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 lg:p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-300 mb-1">Fase Beta Exclusiva!</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Seja um dos primeiros a testar e moldar o futuro da gestão financeira para trabalhadores CLT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-3 lg:p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400 mx-auto mb-2" />
                      <div className="text-xl lg:text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-xs lg:text-sm text-slate-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Coluna Direita: login */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl">
                {renderLoginContent()}

                <div className="mt-6 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Lock className="w-4 h-4" />
                    <span>Dados 100% privados e criptografados</span>
                  </div>
                  {loginMethod === "options" && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
                      <Star className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-800 text-sm font-medium">Acesso Beta Gratuito</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {loginMethod === "options"
                      ? "Como beta tester, o seu feedback é fundamental para construirmos a melhor experiência possível"
                      : "Seus dados são protegidos com criptografia de ponta a ponta"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABAIXO: features + testimonials */}
        <div className="mt-16 space-y-16">
          {/* features */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Funcionalidades Principais
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === activeFeature;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 cursor-pointer border ${
                      isActive
                        ? "bg-slate-800/80 backdrop-blur-sm border-slate-600 scale-[1.02] shadow-xl"
                        : "bg-slate-800/40 backdrop-blur-sm hover:bg-slate-800/60 border-slate-700/50 hover:border-slate-600/50"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="relative flex items-center gap-4">
                      <div
                        className={`relative p-3 rounded-xl transition-all duration-300 ${
                          isActive ? `bg-gradient-to-r ${feature.color} shadow-lg` : "bg-slate-700 group-hover:bg-slate-600"
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                        {isActive && (
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.color} opacity-20 animate-pulse`} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          {isActive && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${feature.color} text-white shadow-sm`}
                            >
                              {feature.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                      </div>

                      {isActive && (
                        <div className="flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* testimonials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              O que dizem os beta testers
            </h4>
            <div className="grid lg:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-2">"{testimonial.text}"</p>
                  <p className="text-slate-500 text-xs">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <p className="text-center text-slate-500 text-xs leading-relaxed">
            Ao continuar, você concorda com nossos{" "}
            <button className="text-slate-400 hover:text-slate-300 underline transition-colors">Termos de Uso</button> e{" "}
            <button className="text-slate-400 hover:text-slate-300 underline transition-colors">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}