import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dayjs } from "@/utils/dayjs";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
	const { data, isLoading } = useRooms()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas recentes</CardTitle>
				<CardDescription>Acesso rápido para as salas criadas recentemente</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="text-muted-foreground text-sm">Carregando salas...</p>
				)}
				{data?.map(room => {
					return (
						<Link 
							className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50" 
							key={room.id} 
							to={`/room/${room.id}`}
						>
							<div className="flex-1">
								<h3 className="font-medium">{room.name}</h3>

								<div className="flex items-center gap-2">
									<Badge className="text-xs" variant="secondary">
										{room.questionsCount} perguntas
									</Badge>
									<Badge className="text-xs" variant="secondary">
										{dayjs(room.createdAt).toNow()}
									</Badge>
								</div>
							</div>

							<span className="flex items-center gap-1">
								Entrar
								<ArrowRight className="size-3" />
							</span>
						</Link>
					)
				})}
			</CardContent>
		</Card>
	)
}