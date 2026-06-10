import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { api } from "../services/api";
import { getProduct } from "../services/products";
import type { ProductType } from "../types/productType";
import type { UserType } from "../types/userType";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Loader from "../components/Loader";
import dayjs from "dayjs";
import {
  FiArrowLeft,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiTag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [seller, setSeller] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = thumbsContainerRef.current;
    if (!container) return;
    const thumb = container.children[activeIndex] as HTMLElement | undefined;
    if (!thumb) return;
    const scrollTarget = thumb.offsetLeft - (container.clientWidth - thumb.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const { data } = await getProduct(id);
        setProduct(data);

        const userId = data?.userId;
        if (userId) {
          const { data: userData } = await api.get(`/users/${userId}`);
          setSeller(userData);
        }
      } catch {
        // handled by empty state below
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  const whatsappLink = seller?.phone
    ? `https://wa.me/55${seller.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Olá! Vi seu anúncio "${product?.title}" no Venda.me e tenho interesse.`
      )}`
    : undefined;

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto w-full">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 max-w-5xl mx-auto w-full flex flex-col items-center justify-center flex-1 gap-4">
        <p className="text-gray-500 text-lg">Anúncio não encontrado.</p>
        <Button variant="outline" onClick={() => navigate(-1)} startIcon={<FiArrowLeft />}>
          Voltar
        </Button>
      </div>
    );
  }

  const statusLabel = {
    available: "Disponível",
    paused: "Pausado",
    sold: "Vendido",
  }[product.status];

  const statusVariant = {
    available: "success",
    paused: "warning",
    sold: "info",
  }[product.status] as "success" | "warning" | "info";

  return (
    <div className="p-6 pt-3 max-w-5xl mx-auto w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
        startIcon={<FiArrowLeft />}
        className="mb-4"
      >
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carousel */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl overflow-hidden shadow-md bg-white">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(s) => { mainSwiperRef.current = s; }}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              className="product-main-swiper"
              style={{ "--swiper-navigation-color": "#ee8128", "--swiper-pagination-color": "#ee8128" } as React.CSSProperties}
            >
              {product.images.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.url}
                    alt={product.title}
                    className="w-full h-80 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {product.images.length > 1 && (
            <div
              ref={thumbsContainerRef}
              className="flex gap-2 overflow-x-auto"
              style={{ height: "88px", scrollbarWidth: "none" }}
            >
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    mainSwiperRef.current?.slideTo(idx);
                    setActiveIndex(idx);
                  }}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeIndex
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-55"
                  }`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={img.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">{product.title}</h1>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs p-1 px-2 bg-gray-100 text-primary-dark rounded-2xl border border-primary-lighter">
                  {product.condition === "novo" ? "Novo" : "Usado"}
                </span>
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>
            </div>

            <p className="text-3xl font-bold text-primary-dark">
              {formatPrice(product.price)}
            </p>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {product.brand && (
                <div className="flex items-center gap-2">
                  <FiTag className="text-primary shrink-0" />
                  <span>
                    <span className="font-medium text-gray-700">Marca:</span> {product.brand}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FiPackage className="text-primary shrink-0" />
                <span>
                  <span className="font-medium text-gray-700">Condição:</span>{" "}
                  {product.condition === "novo" ? "Novo" : "Usado"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiTruck className="text-primary shrink-0" />
                <span>
                  <span className="font-medium text-gray-700">Frete:</span>{" "}
                  {product.shipping ? "Disponível" : "Não disponível"}
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="font-semibold text-gray-700 mb-1">Descrição</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Publicado em {dayjs(product.createdAt).format("DD/MM/YYYY [às] HH:mm")}
            </p>
          </div>
        </div>
      </div>

      {/* Seller Card */}
      {seller && (() => {
        const s = seller;
        return (
          <div className="mt-6 bg-white rounded-xl shadow-md p-5">
            <h2 className="font-semibold text-gray-700 mb-4 text-base">Contato do Revendedor</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                {s.avatar ? (
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-lighter"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary-lighter flex items-center justify-center">
                    <FiUser className="text-primary text-2xl" />
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-gray-800">{s.name}</p>
                  {s.city && s.state && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FiMapPin className="text-primary" />
                      {s.city}, {s.state}
                    </p>
                  )}
                  {s.phone && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FiPhone className="text-primary" />
                      {s.phone}
                    </p>
                  )}
                </div>
              </div>

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-2xl transition-colors duration-300 text-sm whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Conversar no WhatsApp
                </a>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
