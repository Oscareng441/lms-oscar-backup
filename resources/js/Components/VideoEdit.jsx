import PrimaryButton from "@/Components/PrimaryButton";

export default function VideoEdit({video, update, close}) {
	return (
		<div>
			<div>
				Name
				<input 
					value={video.name}
					onChange={(e) => update(e, 'name', video)}
					className="w-full"
				/>
			</div>
			<div>
				Url
				<input 
					value={video.url}
					onChange={(e) => update(e, 'url', video)}
					className="w-full"
				/>
			</div>
			<PrimaryButton onClick={close} >
				ok
			</PrimaryButton>
		</div>
	)
}